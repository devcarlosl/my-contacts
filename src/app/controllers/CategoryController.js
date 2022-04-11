const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll();

    return response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoryRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const newCategory = await CategoryRepository.create({ name });

    return response.json(newCategory);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const isCategoryExists = await CategoryRepository.findById(id);

    if (!isCategoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    const updatedCategory = await CategoryRepository.update(id, { name });

    return response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    const isCategoryExists = await CategoryRepository.findById(id);

    if (!isCategoryExists) {
      return response.status(404).json({ error: 'Category not found' });
    }

    await CategoryRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new CategoryController();
