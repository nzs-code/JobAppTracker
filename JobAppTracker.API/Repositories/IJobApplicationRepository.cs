using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using JobAppTracker.API.Models;

namespace JobAppTracker.API.Repositories
{
    public interface IJobApplicationRepository
    {
        Task<IEnumerable<JobApplication>> GetAllAsync(); // ASYNC???
        Task<JobApplication> GetByIdAsync(Guid id);
        Task AddAsync(JobApplication jobApplication);
//      Task UpdateAsync(JobApplication jobApplication);
//      Task DeleteAsync(Guid id);
//      Task<bool> ExistsAsync(Guid id);
    }
}
