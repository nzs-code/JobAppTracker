using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using JobAppTracker.API.Data;
using JobAppTracker.API.Models;
using JobAppTracker.API.Repositories;

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
        public async Task<ActionResult<JobApplication>> GetJobApplication(Guid id){
            var application = await _jobApplicationRepository.GetByIdAsync(id);

            if (application == null)
            {
                return NotFound();
            }

            return Ok(application); // 200 code
        }

        // POST {jobApplication}
        public async Task<ActionResult<JobApplication>> PostJobApplication(JobApplication jobApplication){
            await _jobApplicationRepository.AddAsync(jobApplication);
            
            return CreatedAtAction(nameof(GetJobApplication), new {id = jobApplication.Id }, jobApplication); // 201 Response
        }
    }
}
    