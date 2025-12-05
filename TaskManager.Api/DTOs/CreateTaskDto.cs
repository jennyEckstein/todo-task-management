using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.DTOs;

public class CreateTaskDto
{
    [Required(ErrorMessage = "Title is required")]
    [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
    public string Title { get; set; } = string.Empty;
    
    [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
    public string? Description { get; set; }
    
    public DateTime? DueDate { get; set; }
    
    [Required]
    public string Priority { get; set; } = "Medium";
    
    [Required]
    public string Status { get; set; } = "Todo";
    
    [MaxLength(50, ErrorMessage = "Category cannot exceed 50 characters")]
    public string? Category { get; set; }
}