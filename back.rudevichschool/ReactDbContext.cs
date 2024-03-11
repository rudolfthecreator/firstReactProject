using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace back.rudevichschool;

public partial class ReactDbContext : DbContext
{

    public ReactDbContext(DbContextOptions<ReactDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=ReactDB;Username=postgres;Password=admin");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("questions_pkey");

            entity.ToTable("questions");

            entity.Property(e => e.QuestionId)
                .UseIdentityAlwaysColumn()
                .HasColumnName("question_id");
            entity.Property(e => e.Answer)
                .HasMaxLength(400)
                .HasDefaultValueSql("''::bpchar")
                .IsFixedLength()
                .HasColumnName("answer");
            entity.Property(e => e.Question1)
                .HasMaxLength(100)
                .HasDefaultValueSql("''::bpchar")
                .IsFixedLength()
                .HasColumnName("question");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("tasks_pkey");

            entity.ToTable("tasks");

            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.Body)
                .HasMaxLength(255)
                .HasDefaultValueSql("''::bpchar")
                .IsFixedLength()
                .HasColumnName("body");
            entity.Property(e => e.Done)
                .HasDefaultValue(false)
                .HasColumnName("done");
            entity.Property(e => e.Priority)
                .HasDefaultValue((short)4)
                .HasColumnName("priority");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasDefaultValueSql("''::bpchar")
                .IsFixedLength()
                .HasColumnName("title");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
