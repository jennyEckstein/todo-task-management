using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;

namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<TasksController> _logger;

    public TasksController(ApplicationDbContext context, ILogger<TasksController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetTasks(
        [FromQuery] string? status = null,
        [FromQuery] string? priority = null,
        [FromQuery] string? category = null,
        [FromQuery] string? sortBy = "dueDate")
    {
        try
        {
            var query = _context.Tasks
                .Where(t => !t.IsDeleted)
                .AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(status) && Enum.TryParse<TodoTaskStatus>(status, true, out var todoTaskStatus))
            {
                query = query.Where(t => t.Status == todoTaskStatus);
            }

            if (!string.IsNullOrEmpty(priority) && Enum.TryParse<TaskPriority>(priority, true, out var taskPriority))
            {
                query = query.Where(t => t.Priority == taskPriority);
            }

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(t => t.Category == category);
            }

            // Apply sorting
            query = sortBy?.ToLower() switch
            {
                "priority" => query.OrderByDescending(t => t.Priority).ThenBy(t => t.DueDate),
                "createdat" => query.OrderByDescending(t => t.CreatedAt),
                "title" => query.OrderBy(t => t.Title),
                _ => query.OrderBy(t => t.DueDate ?? DateTime.MaxValue)
            };

            var tasks = await query.ToListAsync();

            var response = tasks.Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                DueDate = t.DueDate,
                Priority = t.Priority.ToString(),
                Status = t.Status.ToString(),
                Category = t.Category,
                CreatedAt = t.CreatedAt,
                UpdatedAt = t.UpdatedAt
            });

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching tasks");
            return StatusCode(500, new { message = "An error occurred while fetching tasks" });
        }
    }

    // GET: api/tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskResponseDto>> GetTask(int id)
    {
        try
        {
            var task = await _context.Tasks
                .Where(t => !t.IsDeleted)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
            {
                return NotFound(new { message = $"Task with ID {id} not found" });
            }

            var response = new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Priority = task.Priority.ToString(),
                Status = task.Status.ToString(),
                Category = task.Category,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching task {TaskId}", id);
            return StatusCode(500, new { message = "An error occurred while fetching the task" });
        }
    }
    
    // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<TaskResponseDto>> CreateTask([FromBody] CreateTaskDto createTaskDto)
    {
        try
        {
            // Validate the DTO
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Parse enum values
            if (!Enum.TryParse<TaskPriority>(createTaskDto.Priority, true, out var priority))
            {
                return BadRequest(new { message = $"Invalid priority value. Must be Low, Medium, or High." });
            }

            if (!Enum.TryParse<TodoTaskStatus>(createTaskDto.Status, true, out var status))
            {
                return BadRequest(new { message = $"Invalid status value. Must be Todo, InProgress, or Done." });
            }

            // Create new task entity
            var task = new TodoTask
            {
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                DueDate = createTaskDto.DueDate,
                Priority = priority,
                Status = status,
                Category = createTaskDto.Category,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            // Add to database
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            // Return created task
            var response = new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Priority = task.Priority.ToString(),
                Status = task.Status.ToString(),
                Category = task.Category,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating task");
            return StatusCode(500, new { message = "An error occurred while creating the task" });
        }
    }

    // PUT: api/tasks/5
    [HttpPut("{id}")]
    public async Task<ActionResult<TaskResponseDto>> UpdateTask(int id, [FromBody] CreateTaskDto updateTaskDto)
    {
        try
        {
            // Find the task
            var task = await _context.Tasks
                .Where(t => !t.IsDeleted)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
            {
                return NotFound(new { message = $"Task with ID {id} not found" });
            }

            // Validate the DTO
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Parse enum values
            if (!Enum.TryParse<TaskPriority>(updateTaskDto.Priority, true, out var priority))
            {
                return BadRequest(new { message = $"Invalid priority value. Must be Low, Medium, or High." });
            }

            if (!Enum.TryParse<TodoTaskStatus>(updateTaskDto.Status, true, out var status))
            {
                return BadRequest(new { message = $"Invalid status value. Must be Todo, InProgress, or Done." });
            }

            // Update task properties
            task.Title = updateTaskDto.Title;
            task.Description = updateTaskDto.Description;
            task.DueDate = updateTaskDto.DueDate;
            task.Priority = priority;
            task.Status = status;
            task.Category = updateTaskDto.Category;
            task.UpdatedAt = DateTime.UtcNow;

            // Save changes
            await _context.SaveChangesAsync();

            // Return updated task
            var response = new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Priority = task.Priority.ToString(),
                Status = task.Status.ToString(),
                Category = task.Category,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating task {TaskId}", id);
            return StatusCode(500, new { message = "An error occurred while updating the task" });
        }
    }
    
    // PATCH: api/tasks/5/status
    [HttpPatch("{id}/status")]
    public async Task<ActionResult<TaskResponseDto>> UpdateTaskStatus(int id, [FromBody] UpdateTaskStatusDto statusDto)
    {
        try
        {
            var task = await _context.Tasks
                .Where(t => !t.IsDeleted)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
            {
                return NotFound(new { message = $"Task with ID {id} not found" });
            }

            if (!Enum.TryParse<TodoTaskStatus>(statusDto.Status, true, out var status))
            {
                return BadRequest(new { message = $"Invalid status value. Must be Todo, InProgress, or Done." });
            }

            task.Status = status;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            var response = new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Priority = task.Priority.ToString(),
                Status = task.Status.ToString(),
                Category = task.Category,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating task status {TaskId}", id);
            return StatusCode(500, new { message = "An error occurred while updating the task status" });
        }
    }
    
    // DELETE: api/tasks/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTask(int id)
    {
        try
        {
            var task = await _context.Tasks
                .Where(t => !t.IsDeleted)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
            {
                return NotFound(new { message = $"Task with ID {id} not found" });
            }
            
            task.IsDeleted = true;
            task.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting task {TaskId}", id);
            return StatusCode(500, new { message = "An error occurred while deleting the task" });
        }
    }

}