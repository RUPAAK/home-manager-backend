import { Request, Response } from "express";
import { Expense } from "../../../models/expense";
import { ApiFeatures } from "../../../utils/AppFeatures";

const getExpenses = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string | undefined;
  let features: ApiFeatures;

  if (searchTerm) {
    features = new ApiFeatures(
      Expense.find({
        $text: { $search: searchTerm },
      }),
      req.query
    )
      .dateFilter()
      .filter()
      .sort()
      .limitFields()
      .paginate();
  } else {
    features = new ApiFeatures(Expense.find(), req.query)
      .dateFilter()
      .filter()
      .sort()
      .limitFields()
      .paginate();
  }

  const docCount = await Expense.countDocuments();

  const doc = await features.query  

  res.status(200).send({
    total: docCount,
    result: doc.length,
    data: doc,
  });
};

export { getExpenses as getExpensesHandler };
