
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

class DiviseModel extends Alpha {
  imei: string;
  imgUrl: string;
  brand: string;
  model: string;
  color: string;
  releaseDate: string;
  isRemoved: boolean;
  constructor() {
    super();
  }
}

class PhoneModel extends DiviseModel {
  userModel?: UserModel;
  capacityModel?: CapacityModel;

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
    this.reference = [UserModel, CapacityModel];
  }
}

class LaptopModel extends DiviseModel {
  capacityModel?: CapacityModel;

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
    this.reference = [CapacityModel];
  }
}

const user1 = new UserModel('jose', 'mejias', 'jose@gmail.com', 'jose_mejias', '62hdjzk')
const user2 = new UserModel('carlos', 'piña', 'carlos@gmail.com', 'carlos_piña', 'jfu37d')
const user3 = new UserModel('ramon', 'montero', 'ramon@gmail.com', 'ramon_montero', 'jekdod8')

const capacity1 = new CapacityModel("256GB", "8GB", "Snapdragon 8 Gen 2", "3.2GHz");
const capacity2 = new CapacityModel("512GB", "12GB", "Apple A16 Bionic", "3.46GHz");
const capacity3 = new CapacityModel("128GB", "6GB", "Tensor G2", "2.85GHz");

const laptop1 = new LaptopModel("123456789012345", "https://example.com/phone1.jpg", "Apple", "mac 3", "Space Gray", "2022-09-16");
const laptop2 = new LaptopModel("987654321098765", "https://example.com/phone2.jpg", "tochiva", "m3k", "Phantom Black", "2023-02-02");
const laptop3 = new LaptopModel("567890123456789", "https://example.com/phone3.jpg", "lenovo", "idea path", "Snow", "2022-10-13");

const phone1 = new PhoneModel("123456789012345", "https://example.com/phone1.jpg", "Apple", "iPhone 14 Pro", "Space Gray", "2022-09-16");
const phone2 = new PhoneModel("987654321098765", "https://example.com/phone2.jpg", "Samsung", "Galaxy S23 Ultra", "Phantom Black", "2023-02-02");
const phone3 = new PhoneModel("567890123456789", "https://example.com/phone3.jpg", "Google", "Pixel 7 Pro", "Snow", "2022-10-13");
const phone4 = new PhoneModel("567897023493837", "https://example.com/phone3.jpg", "Lg", "K51", "black", "2020-10-13");

const wolfpack = wolfPackCreate([
  UserModel,
  CapacityModel,
  PhoneModel,
  LaptopModel], true);

phone1.userModel = user1;
phone1.capacityModel = capacity1;

phone2.userModel = user2;
phone2.capacityModel = capacity2;

phone3.userModel = user3;
phone3.capacityModel = capacity3;

phone4.userModel = user3;
phone4.capacityModel = capacity3;

laptop1.userModel = user1;
laptop1.capacityModel = capacity1;

laptop2.userModel = user2;
laptop2.capacityModel = capacity2;

laptop3.userModel = user3;
laptop3.capacityModel = capacity3;

wolfpack.PhoneModel.postSync(phone1);
wolfpack.PhoneModel.postSync(phone2);
wolfpack.PhoneModel.postSync(phone3);
wolfpack.PhoneModel.postSync(phone4);

wolfpack.LaptopModel.postSync(laptop1);
wolfpack.LaptopModel.postSync(laptop2);
wolfpack.LaptopModel.postSync(laptop3);

console.log("user: \n", wolfpack.UserModel.getSync(), "\n -------- \n");
console.log("capacity: \n", wolfpack.CapacityModel.getSync(), "\n -------- \n");
console.log("phone: \n", wolfpack.PhoneModel.getSync(), "\n -------- \n");
console.log("laptop: \n", wolfpack.LaptopModel.getSync(), "\n -------- \n");