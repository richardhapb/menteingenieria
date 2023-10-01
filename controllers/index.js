import { Contacto } from '../models/Contacto.js';
import { validateContacto, validatePartialContacto } from '../schemas/Contacto.js';

export class IndexController {
  static async all (req, res) {
    const contactos = await Contacto.all();
    res.status(200).json(contactos);
  }

  static async create (req, res) {
    const result = validateContacto(req.body);

    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    const newReg = await Contacto.create({ input: result.data });

    res.status(201).json(newReg);
  }

  static async update (req, res) {
    const result = validatePartialContacto(req.body);

    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.body;
    const updated = await Contacto.update({ id, input: result.data });

    return res.json(updated);
  }
}
