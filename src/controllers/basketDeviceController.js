const { basketDeviceService, basketService, emailService } = require('../services');

class BasketDeviceController {
  async createBasketDevice(req, res, next) {
    try {
      const { phoneId, basketId } = req.body;

      const basketDevice = await basketDeviceService.createBasketDevice(phoneId, basketId);
      res.json(basketDevice);
    } catch (e) {
      next(e);
    }
  }

  async addBasketDevice(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { phoneId } = req.body;

      const { id } = await basketService.findByUserId(userId);

      if (!id) {
        next(new Error('User doesnt have a basket'));
        return;
      }

      const response = await basketDeviceService.createBasketDevice(phoneId, id);

      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async getByUserId(req, res, next) {
    try {
      const { userId } = req.params;

      const { id: basketId } = await basketService.findByUserId(userId);

      const response = await basketDeviceService.getByBasketId(basketId);

      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteOneByParams(req, res, next) {
    try {
      const { phoneId, userId } = req.body;

      const { id: basketId } = await basketService.findByUserId(userId);

      const response = await basketDeviceService.deleteOneByParams(phoneId, basketId);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async confirmPurchase(req, res, next) {
    try {
      const { email, userId } = req.body;

      const { id: basketId } = await basketService.findByUserId(userId);

      const response = await basketDeviceService.getByBasketId(basketId);

      await emailService.sendMail(email, { response });
      res.json('EMAIL SENDED');
    } catch (e) {
      next(e);
    }
  }

  async deleteAllByBasketId(req, res, next) {
    try {
      const { userId } = req.body;

      const { id: basketId } = await basketService.findByUserId(userId);

      const response = await basketDeviceService.deleteAllByBasketId(basketId);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = {
  basketDeviceController: new BasketDeviceController(),
};
