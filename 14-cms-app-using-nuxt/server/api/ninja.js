export default defineEventHandler(async (event) => {
  // Handles query params
  const { name } = getQuery(event);

  // Handles post data
  const { age } = await readBody(event);

  const result = await $fetch("https://fakestoreapi.com/products/categories");

  console.log(result);

  return {
    message: `Hello ${name}, you're ${age}`,
    data: { ...result },
  };
});
