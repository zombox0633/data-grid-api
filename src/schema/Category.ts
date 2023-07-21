import { RouteShorthandOptions } from "fastify";

const Category = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    last_op_id: { type: "string" },
    created_timestamp: { type: "string", format: "date-time" },
    lastupdate_timestamp: { type: "string", format: "date-time" },
  },
};

export const getAllCategorySchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Category,
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

export const getCategorySchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          data: Category,
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

export const addCategorySchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        last_op_id: { type: "string" },
      },
      required: ["name", "last_op_id"],
    },
    response: {
      201: Category,
      400: {
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
        last_op_id: { type: "string" },
      },
      required: ["name", "last_op_id"],
    },
    response: {
      200: Category,
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

export const deleteCategorySchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
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
