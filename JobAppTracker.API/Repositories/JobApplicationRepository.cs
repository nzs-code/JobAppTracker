using JobAppTracker.API.Repositories;
using Microsoft.Extensions.Logging;
using JobAppTracker.API.Models;
using JobAppTracker.API.Data;
using Microsoft.EntityFrameworkCore;
using JobAppTracker.API.Models.Enums;

namespace JobAppTracker.API.Repositories {
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly JobApplicationContext _context;
        private readonly ILogger<JobApplicationRepository> _logger;
        public JobApplicationRepository(JobApplicationContext context, ILogger<JobApplicationRepository> logger)
        {
            _context = context;
            _logger = logger;
        }
        
        public async Task<IEnumerable<JobApplication>> GetAllAsync()
        {           
            try
            {
                return await _context.JobApplications.ToListAsync();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error fetching all job applications.");
                throw;
            }
        }

        public async Task<JobApplication> GetByIdAsync(Guid id)
        {
            try
            {
                var jobApplication = await _context.JobApplications.FindAsync(id);
                if (jobApplication == null)
                {
                    _logger.LogWarning("No job application found with Id {Id}", id);
                }
                return jobApplication;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error fetching job application with Id {Id}", id);
                throw;
            }        
        }

        public async Task AddAsync(JobApplication jobApplication)
        {
            if(jobApplication == null)
            {
                _logger.LogWarning("Attempted to add a null job application.");
                throw new ArgumentNullException(nameof(jobApplication));
            }

            try
            {
                await _context.JobApplications.AddAsync(jobApplication);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Successfully added job application with Id {Id}", jobApplication.Id);                
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error adding job application.");
                throw;
            }
        }


        public async Task UpdateApplicationStatusAsync(Guid id, ApplicationStatus newStatus)
        {
            try
            {
                await _context.JobApplications
                    .Where(a => a.Id == id)
                    .ExecuteUpdateAsync(setters => setters
                        .SetProperty(a => a.Status, newStatus)
                    );
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error updating status for job application with Id {Id}", id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(JobApplication jobApplication)
        {
            if (jobApplication == null)
            {
                _logger.LogWarning("Attempted to delete a null job application.");
                return false;
            }
            
            try
            {
                if (_context.Entry(jobApplication).State == EntityState.Detached)
                {
                    _context.JobApplications.Attach(jobApplication);
                }

                _context.JobApplications.Remove(jobApplication);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Successfully deleted job application with Id {Id}", jobApplication.Id);
                return true;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error deleting job application with Id {Id}", jobApplication.Id);
                return false;
            }
        }

        public async Task<bool> ExistsAsync(Guid id){
            try
            {
                return await _context.JobApplications.AnyAsync(app => app.Id == id);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error checking existence of job application with Id {Id}", id);
                throw;
            }        
        }
    }
}