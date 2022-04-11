const ContactRepository = require('../repositories/ContactRepositoy');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const isEmailExists = await ContactRepository.findByEmail(email);

    if (isEmailExists) {
      return response.status(400).json({ error: 'Email already exists' });
    }

    const newContact = await ContactRepository.create({
      name, email, phone, category_id,
    });

    return response.json(newContact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const isContactExists = await ContactRepository.findById(id);

    if (!isContactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    const isEmailExists = await ContactRepository.findByEmail(email);

    if (isEmailExists && isEmailExists.id !== id) {
      return response.status(400).json({ error: 'Email already exists' });
    }

    const updatedContact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    return response.json(updatedContact);
  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactRepository.delete(id);

    return response.sendStatus(204);
  }
}

// Singleton -> Só existe uma instância de um objeto,
// independente de quantas vezes for chamado.
module.exports = new ContactController();

// O controller só é responsável em saber da regra
// de negócio da aplicação e mais nada.
