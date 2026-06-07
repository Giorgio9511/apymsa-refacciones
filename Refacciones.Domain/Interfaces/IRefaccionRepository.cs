using Refacciones.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Refacciones.Domain.Interfaces
{
    public interface IRefaccionRepository
    {
        Task<IEnumerable<Refaccion>> GetAllAsync();

        Task<Refaccion?> GetByIdAsync(int id);

        Task<Refaccion> CreateAsync(Refaccion refaccion);

        Task<bool> DeleteAsync(int id);

        Task<bool> UpdateAsync(Refaccion refaccion);
    }
}
