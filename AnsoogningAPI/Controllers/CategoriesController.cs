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
    public class CategoriesController : ControllerBase
    {
        private DatabaseContext _dbContext;
        public CategoriesController(DatabaseContext context)
        {
            _dbContext = context;
        }

        /// <summary>
        /// GET method: api/Categorys
        /// Get's all the categories from the database and orderes it by queue number
        /// </summary>
        /// <returns>An IEnumerable of categoies</returns>
        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return _dbContext.Categories.OrderBy(x => x.QueueNumber).ToList();
        }

        /// <summary>
        /// Get the amount of categories there are in the database
        /// </summary>
        /// <returns>An int of categoies count</returns>
        [HttpGet("AmountOfCategories")]
        public int GetAmountOfCategories()
        {
            return _dbContext.Categories.ToList().Count;
        }

        // GET api/<CategorysController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        /// <summary>
        /// POST method: api/Categorys
        /// Add an category
        /// </summary>
        /// <param name="value">the title of the category</param>
        [HttpPost]
        public void Post([FromBody] string value)
        {
            if (value != null && !String.IsNullOrEmpty(value))
            {
                Category cat = new Category();
                cat.Title = value;
                cat.QueueNumber = _dbContext.Categories.ToList().Count+1;
                cat.LastModifiedDate = DateTime.UtcNow;
                cat.CreatedDate = DateTime.UtcNow;
                _dbContext.Categories.Add(cat);
                _dbContext.SaveChanges();
            }
        }

        // PUT api/<CategorysController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/<CategorysController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
