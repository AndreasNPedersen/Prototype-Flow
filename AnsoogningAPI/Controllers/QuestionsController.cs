using AnsoogningAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AnsoogningAPI.Controllers
{
    /// <summary>
    /// The category controller, that controlls the category endpoint
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private DatabaseContext _dbContext;
        public QuestionsController(DatabaseContext context)
        {
            _dbContext = context;
        }

        /// <summary>
        /// Get method: api/questions
        /// get all the question in the database
        /// </summary>
        /// <returns>IEnumerable of question</returns>
        [HttpGet()]
        public IEnumerable<Question> Get()
        {
            var list = _dbContext.Questions.ToList();
            
            return list;
        }


        /// <summary>
        /// Get method: api/Questions/5
        /// Get's the question from a specific category id
        /// </summary>
        /// <param name="id">Id of the category</param>
        /// <returns>IEnumerable of question</returns>
        [HttpGet("{id}")]
        public IEnumerable<Question> Get(int id)
        {
            var list = _dbContext.CategoryQuestions.Include(x=>x.Question).Where(x=> x.Category.CategoryId == id).OrderBy(x=>x.QueueNumber).ToList();
            var listOfOnlyquestions = new List<Question>();
            foreach (var question in list)
            {
                listOfOnlyquestions.Add(question.Question);
            }
            return listOfOnlyquestions;
        }

        /// <summary>
        /// Get method: api/Questions/start/5
        /// Get the question that starts the flow in the category
        /// </summary>
        /// <param name="id">Id of the category</param>
        /// <returns>An int of the id, of the question</returns>
        [HttpGet("start/{id}")]
        public int GetStartOnFlow(int id)
        {
            var question = _dbContext.CategoryQuestions.Include(x => x.Question).Where(x => x.Category.CategoryId == id).FirstOrDefault();
            
            return question.Question.QuestionId;
        }

        /// <summary>
        /// POST method: api/Questions/
        /// Make a new question
        /// </summary>
        /// <param name="value">The question</param>
        /// <param name="Categoryid">The Id of the category in which the question should be added</param>
        /// <returns>IActionResult of the status</returns>
        [HttpPost]
        public IActionResult Post([FromBody] Question value, int Categoryid)
        {   
            Category category = _dbContext.Categories.Where(x => x.CategoryId == Categoryid).FirstOrDefault();
            if (value != null && !String.IsNullOrEmpty(value.UserTitle) &&
                !String.IsNullOrEmpty(value.AdminTitle) && category != null)
            {
                value.LastModifiedDate = DateTime.UtcNow;
                value.CreatedDate = DateTime.UtcNow;
                _dbContext.Questions.Add(value);
                _dbContext.SaveChanges();
                Question question = _dbContext.Questions.Where(x => x.CreatedDate == value.CreatedDate).FirstOrDefault();
                CategoryQuestion categoryQuestions = new CategoryQuestion();
                categoryQuestions.Question = question;
                categoryQuestions.Category = category;
                categoryQuestions.QueueNumber = _dbContext.CategoryQuestions.Where(x=>x.Category.CategoryId==Categoryid).Count() + 1;
                _dbContext.CategoryQuestions.Add(categoryQuestions);
                _dbContext.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        // PUT api/<QuestionsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<QuestionsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
