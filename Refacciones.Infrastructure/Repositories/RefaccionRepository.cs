using Microsoft.EntityFrameworkCore;
using Refacciones.Domain.Entities;
using Refacciones.Domain.Interfaces;
using Refacciones.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Refacciones.Infrastructure.Repositories
{
    public class RefaccionRepository : IRefaccionRepository
    {
        private readonly AppDbContext _context;

        public RefaccionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Refaccion> CreateAsync(Refaccion refaccion)
        {
            _context.Refacciones.Add(refaccion);
            await _context.SaveChangesAsync();
            return refaccion;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var refaccion = await _context.Refacciones.FindAsync(id);
            if (refaccion == null) return false;

            _context.Refacciones.Remove(refaccion);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Refaccion>> GetAllAsync() => await _context.Refacciones.ToListAsync();

        public async Task<Refaccion?> GetByIdAsync(int id) => await _context.Refacciones.FirstOrDefaultAsync(r => r.Id == id);

        public async Task<bool> UpdateAsync(Refaccion refaccion)
        {
            _context.Refacciones.Update(refaccion);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
