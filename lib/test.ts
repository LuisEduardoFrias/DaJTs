////
import { wolfPackCreate, Alpha } from "./index.js";

class UserModel extends Alpha {
  name: string;
  lastName: string;
  email: string;
  user: string;
  password: string;

  constructor(name: string, lastName: string, email: string, user: string, password: string) {
    super();
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.user = user;
    this.password = password;
    this.referred = PhoneModel;
  }
}

class CapacityModel extends Alpha {
  rom: string;
  ramMemory: string;
  processor: string;
  processorSpeed: string;

  constructor(rom: string, ramMemory: string, processor: string, processorSpeed: string) {
    super();
    this.rom = rom;
    this.ramMemory = ramMemory;
    this.processor = processor;
    this.processorSpeed = processorSpeed;
    this.referred = PhoneModel;
  }
}

class PhoneModel extends Alpha {
  imei: string;
  imgUrl: string;
  brand: string;
  model: string;
  color: string;
  releaseDate: string;
  isRemoved: boolean;

  constructor(imei: string,
    imgUrl: string,
    brand: string,
    model: string,
    color: string,
    releaseDate: string,
  ) {
    super();
    this.imei = imei;
    this.imgUrl = imgUrl;
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.releaseDate = releaseDate;
    this.isRemoved = false;
    this.reference = [UserModel, CapacityModel]
  }
}

// Instancias de PhoneModel con valores reales
const phone1 = new PhoneModel("123456789012345", "https://example.com/phone1.jpg", "Apple", "iPhone 14 Pro", "Space Gray", "2022-09-16");
const phone2 = new PhoneModel("987654321098765", "https://example.com/phone2.jpg", "Samsung", "Galaxy S23 Ultra", "Phantom Black", "2023-02-02");
const phone3 = new PhoneModel("567890123456789", "https://example.com/phone3.jpg", "Google", "Pixel 7 Pro", "Snow", "2022-10-13");

// Instancias de CapacityModel con valores reales
const capacity1 = new CapacityModel("256GB", "8GB", "Snapdragon 8 Gen 2", "3.2GHz");
const capacity2 = new CapacityModel("512GB", "12GB", "Apple A16 Bionic", "3.46GHz");
const capacity3 = new CapacityModel("128GB", "6GB", "Tensor G2", "2.85GHz");

const wolfpack = wolfPackCreate([UserModel, CapacityModel, PhoneModel]);
wolfpack.UserModel.postSync(phone1);
/*
console.log(wolfpack.UserModel.getSync());
console.log("-------");

wolfpack.UserModel.postSync(phone2);
console.log(wolfpack.UserModel.getSync());
console.log("-------");

wolfpack.UserModel.postSync(phone3);

console.log('ById: ', wolfpack.UserModel.getByIdSync(phone2.id));
console.log("-------");

phone2.model = 'Galaxy S24 Ultra';
wolfpack.UserModel.putSync(phone2);

console.log('ById: ', wolfpack.UserModel.getByIdSync(phone2.id));
console.log("-------");

wolfpack.CapacityModel.postSync(capacity1);
wolfpack.CapacityModel.postSync(capacity2);
wolfpack.CapacityModel.postSync(capacity3);

console.log(wolfpack.UserModel.getSync());
console.log("-------");

wolfpack.UserModel.removeSync(phone3.id);

console.log(wolfpack.UserModel.getSync());
console.log("-------");
*/