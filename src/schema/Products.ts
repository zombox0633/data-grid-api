import { RouteShorthandOptions } from "fastify";

const Product = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    category_id: { type: "string" },
    price: { type: "number" },
    quantity: { type: "number" },
    last_op_id: { type: "string" },
    created_timestamp: { type: "string", format: "date-time" },
    lastupdate_timestamp: { type: "string", format: "date-time" },
  },
};

export const getAllProductSchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Product,
      },
      400: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

export const getProductSchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          data: Product,
        },
      },
      400: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

export const addProductSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        category_id: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },
        last_op_id: { type: "string" },
      },
      required: ["name", "category_id", "price", "last_op_id"],
    },
    response: {
      201: Product,
      400: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

export const updateCategorySchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        category_id: { type: "string" },
        price: { type: "number" },
        quantity: { type: "number" },
        last_op_id: { type: "string" },
      },
      required: ["last_op_id"],
    },
    response: {
      200: Product,
      400: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

export const deleteProductSchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      401: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      404: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      500: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};
