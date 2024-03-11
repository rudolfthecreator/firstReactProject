using Microsoft.AspNetCore.Mvc;
using back.rudevichschool;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace back.rudevichschool.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionsController(ReactDbContext context) : ControllerBase
    {
        private readonly ReactDbContext _context = context;

        [HttpGet("getQuestions")]
        public List<Question> GetQuestions()
        {
            var res = _context.Questions.OrderBy(o => o.QuestionId).ToList();
            return res;
        }

        [HttpPost("addQuestion")]
        public void AddQuestion(Question question)
        {
            _context.Questions.Add(question);
            _context.SaveChanges();

        }

        [HttpPost("updateQuestion")]
        public async Task<ActionResult> UpdateQuestion(Question question)
        {
            Question? item = await _context.Questions.FirstOrDefaultAsync(w => w.QuestionId == question.QuestionId);

            if (item != null)
            {
                item.Question1 = question.Question1;
                item.Answer = question.Answer;
                await _context.SaveChangesAsync();
            }
            return Ok();

        }



        [HttpDelete("deleteQuestion/{id}")]
        public async Task<ActionResult> DeleteQuestion(int id)
        {
            Question? item = await _context.Questions.FirstOrDefaultAsync(w => w.QuestionId == id);
            
            if (item!=null) {
                _context.Questions.Remove(item);
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
