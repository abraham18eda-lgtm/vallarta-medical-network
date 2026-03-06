'use client';

export default function NewBlock() {
  return (
    <form className="max-w-xl">
      <select className="w-full p-2 border mb-3">
        <option value="hero">HeroSlider</option>
        <option value="promo">PromoBanner</option>
        <option value="banner">Header Banner</option>
      </select>

      <textarea
        className="w-full h-40 border p-2"
        placeholder='JSON del bloque'
      />

      <input type="datetime-local" className="w-full p-2 border mb-3" />
      <input type="datetime-local" className="w-full p-2 border mb-3" />

      <button className="bg-black text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  );
}