using Refacciones.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Refacciones.Application.Interfaces
{
    public interface IRefaccionService
    {
        Task<IEnumerable<RefaccionDto>> GetAllAsync();
        Task<RefaccionDto?> GetByIdAsync(int id);
        Task<RefaccionDto> CreateAsync(CreateRefaccionDto dto);
        Task<bool> UpdateAsync(int id, CreateRefaccionDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
