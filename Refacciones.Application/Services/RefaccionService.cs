using Refacciones.Application.DTOs;
using Refacciones.Application.Interfaces;
using Refacciones.Domain.Entities;
using Refacciones.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Refacciones.Application.Services
{
    public class RefaccionService : IRefaccionService
    {
        private readonly IRefaccionRepository _repository;

        public RefaccionService(IRefaccionRepository repository)
        {
            _repository = repository;
        }

        public async Task<RefaccionDto> CreateAsync(CreateRefaccionDto dto)
        {
            var refaccion = new Refaccion
            {
                Nombre = dto.Nombre,
                Descripcion = dto.Descripcion,
                Precio = dto.Precio,
                Stock = dto.Stock,
                Categoria = dto.Categoria,
            };

            var creada = await _repository.CreateAsync(refaccion);

            return new RefaccionDto
            {
                Id = creada.Id,
                Nombre = creada.Nombre,
                Descripcion = creada.Descripcion,
                Precio = creada.Precio,
                Stock = creada.Stock,
                Categoria = creada.Categoria,
            };
        }

        public async Task<bool> DeleteAsync(int id) => await _repository.DeleteAsync(id);

        public async Task<IEnumerable<RefaccionDto>> GetAllAsync()
        {
            var refacciones = await _repository.GetAllAsync();
            return refacciones.Select(r => new RefaccionDto
            {
                Id = r.Id,
                Nombre = r.Nombre,
                Descripcion = r.Descripcion,
                Precio = r.Precio,
                Stock = r.Stock,
                Categoria = r.Categoria
            });
        }

        public async Task<RefaccionDto?> GetByIdAsync(int id)
        {
            var refaccion = await _repository.GetByIdAsync(id);

            if (refaccion == null) return null;

            return new RefaccionDto
            {
                Nombre = refaccion.Nombre,
                Descripcion = refaccion.Descripcion,
                Id = refaccion.Id,
                Categoria = refaccion.Categoria,
                Precio = refaccion.Precio,
                Stock = refaccion.Stock,
            };
        }

        public async Task<bool> UpdateAsync(int id, CreateRefaccionDto dto)
        {
            var refaccion = await _repository.GetByIdAsync(id);

            if (refaccion == null) return false;

            refaccion.Nombre = dto.Nombre;
            refaccion.Descripcion = dto.Descripcion;
            refaccion.Stock = dto.Stock;
            refaccion.Categoria = dto.Categoria;
            refaccion.Precio = dto.Precio;

            return await _repository.UpdateAsync(refaccion);
        }
    }
}
