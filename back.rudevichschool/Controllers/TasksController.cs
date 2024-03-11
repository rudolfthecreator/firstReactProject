using Microsoft.AspNetCore.Mvc;
using back.rudevichschool;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace back.rudevichschool.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController(ReactDbContext context) : ControllerBase
    {
        private readonly ReactDbContext _context = context;

        [HttpGet("getTasks")]
        public List<Task> GetTasks()
        {
            //var res = _context.Tasks.Where(w => !w.Done).ToList();
            var res = _context.Tasks.OrderBy(o => o.TaskId).ToList();
            return res;
        }

        [HttpPost("addTask")]
        public void AddTask(Task task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();

        }

        [HttpDelete("deleteTask/{id}")]
        public async Task<ActionResult> DeleteTask(int id)
        {
            Task? item = await _context.Tasks.FirstOrDefaultAsync(w => w.TaskId == id);

            if (item!=null) { 
                _context.Tasks.Remove(item);
            await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpPost("doneTask/{id}")]
        public async Task<ActionResult> DoneTask(int id)
        {
            Task? item = await _context.Tasks.FirstOrDefaultAsync(w => w.TaskId == id);

            if (item != null)
            {
                item.Done = true;
                await _context.SaveChangesAsync();
            }

            return Ok();
        }
    }
}
