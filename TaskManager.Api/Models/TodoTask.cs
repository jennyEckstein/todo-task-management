using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Models;

public class TodoTask
{
    public int Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;
    
    [MaxLength(1000)]
    public string? Description { get; set; }
    
    public DateTime? DueDate { get; set; }
    
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    
    public TodoTaskStatus Status { get; set; } = TodoTaskStatus.Todo;
    
    [MaxLength(50)]
    public string? Category { get; set; }
    
    public bool IsDeleted { get; set; } = false;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum TaskPriority
{
    Low = 0,
    Medium = 1,
    High = 2
}

public enum TodoTaskStatus
{
    Todo = 0,
    InProgress = 1,
    Done = 2
}