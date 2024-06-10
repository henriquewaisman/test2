import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserBankService {
  constructor() {}

  async listUserBank() {
    try {
      return await prisma.user.findMany({
        select: {
          name: true,
          email: true,
          password: false
        }
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async insertUserBank(user: Prisma.UserCreateInput) {
    try {
      const newuser = await prisma.user.create({
        data: user,
      });
      return newuser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateUserBank(user: Prisma.UserUpdateInput, id: number) {
    try {
      const updatedUser = await prisma.user.update({
        data: user,
        where: {
          id: id,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteUserBank(id: number) {
    try {
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new UserBankService();