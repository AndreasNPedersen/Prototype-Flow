using AnsoogningAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AnsoogningAPI.Controllers
{
    /// <summary>
    /// The Answer controller, that controlls the API endpoints
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private DatabaseContext _dbContext;
        public AnswersController(DatabaseContext context)
        {
            _dbContext = context;
        }


        /// <summary>
        /// The endpoint is a GET api/Answers/5
        /// the method is to get all the answers of a question's Id
        /// </summary>
        /// <param name="id">Id of the question</param>
        /// <returns>List of answers</returns>
        [HttpGet("{id}")]
        public IEnumerable<Answer> Get(int id)
        {
            var list = _dbContext.QuestionAnswers.Include(x=>x.Answer).Include(x=>x.Question).Where(x => x.Question.QuestionId == id).ToList();
            var resultList = new List<Answer>();
            foreach (var answer in list)
            {
                resultList.Add(answer.Answer);
            }
            return resultList;
        }

        /// <summary>
        /// POST method api/Answers?questionId={questionId}
        /// Make a new Answer from to a question
        /// </summary>
        /// <param name="value">Answer class from body</param>
        /// <param name="questionId">Id of the question</param>
        [HttpPost]
        public void Post([FromBody] Answer value, int questionId)
        {
            if (value != null && value.ToQuestion>=0 && !String.IsNullOrEmpty(value.InputType)
                &&!String.IsNullOrEmpty(value.TheAnswer))
            {
                Answer answer = new (){ 
                    AnswerId=value.AnswerId, InputType=value.InputType, 
                    TheAnswer=value.TheAnswer, CreatedDate=DateTime.Now,
                    LastModifiedDate = DateTime.Now, ToQuestion= value.ToQuestion
            };
                _dbContext.Answers.Add(answer);
                _dbContext.SaveChanges();
                var answerCopyFromDB = _dbContext.Answers.Where(x => x.CreatedDate == answer.CreatedDate).FirstOrDefault();
                var questionCopyFromDB = _dbContext.Questions.Where(x => x.QuestionId == questionId).FirstOrDefault();
                if (answerCopyFromDB != null && questionCopyFromDB != null)
                {
                    QuestionAnswer questionAnswer = new QuestionAnswer() { Answer = answerCopyFromDB, Question = questionCopyFromDB };
                    _dbContext.QuestionAnswers.Add(questionAnswer);
                    _dbContext.SaveChanges();
                    
                }
            }
        }

        // PUT api/<AnswersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AnswersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
