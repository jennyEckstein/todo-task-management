using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Models;

namespace TaskManager.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<TodoTask> Tasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<TodoTask>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(200);
            
            entity.Property(e => e.Description)
                .HasMaxLength(1000);
            
            entity.Property(e => e.Category)
                .HasMaxLength(50);
            
            entity.Property(e => e.CreatedAt)
                .IsRequired();
            
            entity.Property(e => e.UpdatedAt)
                .IsRequired();
            
            entity.HasIndex(e => e.Status);
            entity.HasIndex(e => e.DueDate);
            entity.HasIndex(e => e.IsDeleted);
        });

        // sample data
        modelBuilder.Entity<TodoTask>().HasData(
            new TodoTask
            {
                Id = 1,
                Title = "Setup project repository",
                Description = "Initialize Git repository and create basic project structure",
                Priority = TaskPriority.High,
                Status = TodoTaskStatus.Done,
                Category = "DevOps",
                DueDate = DateTime.UtcNow.AddDays(-1),
                CreatedAt = DateTime.UtcNow.AddDays(-5),
                UpdatedAt = DateTime.UtcNow.AddDays(-1)
            },
            new TodoTask
            {
                Id = 2,
                Title = "Design database schema",
                Description = "Create ERD for the task management system",
                Priority = TaskPriority.High,
                Status = TodoTaskStatus.InProgress,
                Category = "Backend",
                DueDate = DateTime.UtcNow.AddDays(2),
                CreatedAt = DateTime.UtcNow.AddDays(-4),
                UpdatedAt = DateTime.UtcNow
            },
            new TodoTask
            {
                Id = 3,
                Title = "Implement API endpoints",
                Description = "Create RESTful endpoints for CRUD operations",
                Priority = TaskPriority.High,
                Status = TodoTaskStatus.Todo,
                Category = "Backend",
                DueDate = DateTime.UtcNow.AddDays(5),
                CreatedAt = DateTime.UtcNow.AddDays(-3),
                UpdatedAt = DateTime.UtcNow.AddDays(-3)
            }
        );
    }
}