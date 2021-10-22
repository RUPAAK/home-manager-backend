import { Request, Response } from "express";
import { Bank } from "../../../models/bank";
import { ApiFeatures } from "../../../utils/AppFeatures";

const getBanks = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string | undefined;
  let features: ApiFeatures;

  if (searchTerm) {
    features = new ApiFeatures(
      Bank.find({
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
    features = new ApiFeatures(Bank.find(), req.query)
      .dateFilter()
      .filter()
      .sort()
      .limitFields()
      .paginate();
  }

  const docCount = await Bank.countDocuments();

  const doc = await features.query;
  res.status(200).send({
    total: docCount,
    results: doc.length,
    data: doc,
  });
};

export { getBanks as getBanksHandler };
