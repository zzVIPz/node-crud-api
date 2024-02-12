const MESSAGE_SERVICE = {
  invalidId: (id: string) => `Used id ${id} is not valid`,
  notFoundIdId: (id: string) => `User with id ${id} does not found`,
  deleteSuccess: (id: string) => `User with id ${id} was successfully deleted`,
  invalidPayload: `User payload data is not valid`,
};

export default MESSAGE_SERVICE;
