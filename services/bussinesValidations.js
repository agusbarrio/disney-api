const usersRepository = require('../repositories/users');
const charactersRepository = require('../repositories/characters');

const { ERRORS } = require('../constants/errors');
const bussinesValidations = {
  validTargetPrograms: async ({ programIds, userId }) => {
    if (programIds.length > 0) {
      const user = await usersRepository.getById(userId);
      const programs = await user.getPrograms();
      const userProgramIds = programs.map((program) => program.id);
      if (programIds.some((id) => !userProgramIds.includes(id)))
        throw ERRORS.INVALID_TARGET_TEAMS;
    }
  },
};

module.exports = bussinesValidations;
