using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Refacciones.Application.DTOs;
using Refacciones.Application.Interfaces;

namespace Refacciones.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefaccionesController : ControllerBase
    {
        private readonly IRefaccionService _service;

        public RefaccionesController(IRefaccionService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var refaccion = await _service.GetByIdAsync(id);

            if(refaccion == null) return NotFound();

            return Ok(refaccion);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateRefaccionDto dto)
        {
            var creada = await _service.CreateAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = creada.Id }, creada);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateRefaccionDto dto)
        {
            var resultado = await _service.UpdateAsync(id, dto);

            if(!resultado) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var resultado = await _service.DeleteAsync(id);

            if (!resultado) return NotFound();

            return NoContent();
        }

    }
}
