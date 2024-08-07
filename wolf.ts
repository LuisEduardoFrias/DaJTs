import wolfpack, { alpha } from "wolf";

class UserModel extends alpha {
  constructor(name, lastName, email, user, password) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.user = user;
    this.password = password;
  }
}

class CapacityModel extends alpha {
  constructor(capacity) {
    super();
    this.rom = capacity.rom;
    this.ramMemory = capacity.ramMemory;
    this.processor = capacity.processor;
    this.processorSpeed = capacity.processorSpeed;
  }
}

class PhoneModel extends alpha {
  constructor(phone) {
    super();
    this.imei = phone.imei;
    this.imgUrl = phone.imgUrl;
    this.brand = phone.brand;
    this.model = phone.model;
    this.color = phone.color;
    this.capacity = new CapacityModel(phone.capacity);
    this.releaseDate = phone.releaseDate;
    this.isRemoved = false;
  }
}

export default wolfpack.app(
  [
    UserModel,
    CapacityModel,
    PhoneModel
  ]);


wolfpack.UserModel.get();
wolfpack.UserModel.getBy({ name: "deivi" })
wolfpack.UserModel.getByKey("gju-ey7iu-frt6h-grtj7")
wolfpack.UserModel.post({});
wolfpack.UserModel.put({});
wolfpack.UserModel.remove({});
wolfpack.UserModel.remove("gju-ey7iu-frt6h-grtj7")