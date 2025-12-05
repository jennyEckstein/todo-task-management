using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.DTOs;

public class UpdateTaskStatusDto
{
    [Required]
    public string Status { get; set; } = string.Empty;
}