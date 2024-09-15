// // import our Supabase instance
// const supabase = require("../../supabaseInstance");

// app.use('/snacks', apiKeyMiddleware, snacksRouter);


// const updateById = async (request, response, next) => {
//   try {
//     // destructure our request.body object so we can store the fields in variables
//     const { name, description, price, category, inStock } = request.body;

//     // error handling if request doesn't send all fields necessary
//     if (!name || !description || !price || !category || !inStock) {
//       return response
//         .status(400)
//         .json({ message: "Missing required fields!!" });
//     }

//     const updatedBeverage = {
//       // id: SNACKS.length + 1,
//       name,
//       description,
//       price,
//       category,
//       inStock,
//     };

//     const res = await supabase.patch(
//       `/snacks?id=eq.${request.params.id}`,
//       updatedSnacks
//     );

//     // send ok response
//     response.status(200).send();
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = updateById;