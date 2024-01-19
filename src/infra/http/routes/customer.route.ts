import { Request, Response, Router } from "express";
import { CreateCustomerUseCase } from "../../../use-cases/customer/create/create-customer";
import { DeleteCustomerUseCase } from "../../../use-cases/customer/delete/delete-customer";
import { FindCustomerUseCase } from "../../../use-cases/customer/find/find-customer";
import { ListCustomerUseCase } from "../../../use-cases/customer/list/list-customers";
import { UpdateCustomerUseCase } from "../../../use-cases/customer/update/update-customer";
import { PrismaCustomerRepository } from "../../customer/repository/prisma/prisma.repository";
import { HttpCreateCustomerAdapter } from "../adapters/customer/http-create-customer.adapter";
import { HttpFindCustomerAdapter } from "../adapters/customer/http-find-customer.adapter";
import { HttpUpdateCustomerAdapter } from "../adapters/customer/http-update-customer.adapter";
import { CreateCustomerValidator } from "../validators/customer/create-customer.validate";
import { UpdateCustomerValidator } from "../validators/customer/update-customer.validator";

const customerRoute = Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const createCustomerUseCase = new CreateCustomerUseCase(
    new PrismaCustomerRepository()
  );

  const createCustomerDTO = CreateCustomerValidator.validate(req.body);

  const { customer } = await createCustomerUseCase.execute(createCustomerDTO);

  res.json(HttpCreateCustomerAdapter.toJson(customer));
});

customerRoute.get("/:id/view", async (req: Request, res: Response) => {
  const findCustomerUseCase = new FindCustomerUseCase(
    new PrismaCustomerRepository()
  );

  const { customer } = await findCustomerUseCase.execute({ id: req.params.id });

  res.json(HttpFindCustomerAdapter.toJson(customer));
});

customerRoute.get("/list", async (req: Request, res: Response) => {
  const listCustomerUseCase = new ListCustomerUseCase(
    new PrismaCustomerRepository()
  );

  const { customers } = await listCustomerUseCase.execute();

  res.json(customers.map(HttpFindCustomerAdapter.toJson));
});

customerRoute.put("/", async (req: Request, res: Response) => {
  const updateCustomerUseCase = new UpdateCustomerUseCase(
    new PrismaCustomerRepository()
  );

  const updatedCustomerDTO = UpdateCustomerValidator.validate(req.body);

  const { customer } = await updateCustomerUseCase.execute(updatedCustomerDTO);

  res.json(HttpUpdateCustomerAdapter.toJson(customer));
});

customerRoute.delete("/:id", async (req: Request, res: Response) => {
  const deleteCustomerUseCase = new DeleteCustomerUseCase(
    new PrismaCustomerRepository()
  );

  const { status } = await deleteCustomerUseCase.execute({ id: req.params.id });

  res.json({ status });
});

export { customerRoute };
