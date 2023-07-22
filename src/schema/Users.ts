import { RouteShorthandOptions } from "fastify";

const User = {
  type: "object",
  properties: {
    id: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    name: { type: "string" },
    role: { type: "string" },
    last_op_id: { type: "string" },
    created_timestamp: { type: "string", format: "date-time" },
    lastupdate_timestamp: { type: "string", format: "date-time" },
  },
};

export const getUsersSchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: User,
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

export const getUserSchema: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          data: User,
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

export const addUserSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
        name: { type: "string" },
        role: { type: "string" },
        last_op_id: { type: "string" },
      },
      required: ["email", "password", "name", "role", "last_op_id"],
    },
    response: {
      201: User,
      400: {
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
      403: {
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

export const updateUserSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        role: { type: "string" },
        last_op_id: { type: "string" },
      },
      required: ["last_op_id"],
    },
    response: {
      200: User,
      400: {
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
      403: {
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

export const editPasswordSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        oldPassword: { type: "string" },
        newPassword1: { type: "string" },
        newPassword2: { type: "string" },
        last_op_id: { type: "string" },
      },
      required: ["oldPassword", "newPassword1", "newPassword2", "last_op_id"],
    },
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

export const deleteUserSchema: RouteShorthandOptions = {
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
