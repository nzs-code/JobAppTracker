using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using JobAppTracker.API.Data;
using JobAppTracker.API.Models;
using JobAppTracker.API.Repositories;
using JobAppTracker.API.Models.Enums;
//using 

namespace JobAppTracker.API.Controllers{

    [Route("applications")]
    [ApiController]
    public class JobApplicationController : ControllerBase {

        private readonly IJobApplicationRepository _jobApplicationRepository;

        public JobApplicationController(IJobApplicationRepository jobApplicationRepository)
        {
            _jobApplicationRepository = jobApplicationRepository;
        }

        // GET: applications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetJobApplications()
        {
            var applications = await _jobApplicationRepository.GetAllAsync();
            return Ok(applications); // 200 code
        }

        // GET: applications/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetJobApplication(Guid id)
        {
            var application = await _jobApplicationRepository.GetByIdAsync(id);

            if (application == null)
                return NotFound();

            return Ok(application); // 200 code
        }

        // POST applications
        [HttpPost]
        public async Task<ActionResult<JobApplication>> PostJobApplication([FromBody] JobApplication jobApplication)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                       
            await _jobApplicationRepository.AddAsync(jobApplication);            
            return CreatedAtAction(nameof(GetJobApplication), new {id = jobApplication.Id }, jobApplication); // 201 Response
        }

        // PUT: applications/{id}/status
        [HttpPut("{id}/status")]
        public async Task<ActionResult<JobApplication>> EditApplicationStatus(Guid id, [FromBody] ApplicationStatus newStatus)
        {           
            await _jobApplicationRepository.UpdateApplicationStatusAsync(id, newStatus);
            var application = await _jobApplicationRepository.GetByIdAsync(id);
            
            if (application == null)
                return NotFound(); // 404 Response
            
            return Ok(application); // 200 Response
        }

        // DELETE: applications/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteJobApplication(Guid id)
        {

            if (!await _jobApplicationRepository.ExistsAsync(id))
                return NotFound();

            var jobApplication = await _jobApplicationRepository.GetByIdAsync(id);
            if (jobApplication == null)
                return NotFound();

            bool result = await _jobApplicationRepository.DeleteAsync(jobApplication);
            if (!result)
                return StatusCode(500, "An Error occurred while deleting the job application."); // 500 Response

            return NoContent(); // 204 Code
        }

    }
}
    