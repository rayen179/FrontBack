using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projet;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Projet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly DataContext _context;

        public QuestionsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            return await _context.Questions
                                 .Include(q => q.Answers)
                                 .ToListAsync();
        }

        [HttpPost("answers")]
        public async Task<IActionResult> SubmitAnswers([FromBody] Answer answers)
        {
            if (answers == null ) {
                return BadRequest("No answers provided.");
            }
            _context.Answers.AddRange(answers);
            await _context.SaveChangesAsync();
            return Ok();
        }



        // PUT: api/questions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, [FromBody] Question question)
        {
            if (id != question.Id)
            {
                return BadRequest("Question ID mismatch.");
            }

            var existingQuestion = await _context.Questions
                                                 .Include(q => q.Answers)
                                                 .FirstOrDefaultAsync(q => q.Id == id);

            if (existingQuestion == null)
            {
                return NotFound("Question not found.");
            }

            // Update question properties
            existingQuestion.Text = question.Text;
            existingQuestion.Type = question.Type;
            existingQuestion.Options = question.Options;

            // Update answers
            _context.Answers.RemoveRange(existingQuestion.Answers);
            existingQuestion.Answers = question.Answers;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound("Question not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/questions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions
                                         .Include(q => q.Answers)
                                         .FirstOrDefaultAsync(q => q.Id == id);

            if (question == null)
            {
                return NotFound("Question not found.");
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }
    }
}
