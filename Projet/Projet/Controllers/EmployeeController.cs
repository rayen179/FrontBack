using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Projet.Data;
using System.Threading.Tasks;

namespace Projet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize]  //uncomment it to protect thr routes actions
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;
        private readonly AppDbContext _authContext;
       


        public EmployeeController(EmployeeRepository employeeRepository, AppDbContext context)
        {
            _employeeRepository = employeeRepository;
            _authContext = context;
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult> AddEmployee([FromBody] Employee model)
        {

            await _employeeRepository.AddEmployeeAsync(model);
            return Ok();

        }
        [HttpPost("register")]
        public async Task<IActionResult> AddUser([FromBody] Employee userObj)
        {
            if (userObj == null)
                return BadRequest();

            // check email
            if (await CheckEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "Email Already Exist" }); 
            
            await _authContext.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Status = 200,
                Message = "User Added!"
            });
        }

        //check Email
        private async Task<bool> CheckEmailExistAsync(string? email)
        {
          return await  _authContext.Employees.AnyAsync(x => x.Email == email);
        }




        [HttpGet]

        public async Task<ActionResult> GetEmployeeList()
        {
            var employeeList = await _employeeRepository.GetAllEmployeeAsync();
            return Ok(employeeList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployeeById([FromRoute] int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            return Ok(employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmployee([FromRoute] int id, [FromBody] Employee model)
        {
            await _employeeRepository.UpdateEmployeeAsync(id, model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee([FromRoute] int id)
        {
            await _employeeRepository.DeleteEmployeeAsnyc(id);
            return Ok();
        }
    }
}