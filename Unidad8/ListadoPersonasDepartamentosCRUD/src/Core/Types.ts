const TYPES = {
  BaseApi: Symbol.for("BaseApi"),
  IPersonaApi: Symbol.for("IPersonaApi"),
  IDepartamentoApi: Symbol.for("IDepartamentoApi"),
  IPersonaRepository: Symbol.for("IPersonaRepository"),
  IDepartamentoRepository: Symbol.for("IDepartamentoRepository"),
  IPersonaUseCase: Symbol.for("IPersonaUseCase"),
  IDepartamentoUseCase: Symbol.for("IDepartamentoUseCase"),
  PersonaViewModel: Symbol.for("PersonaViewModel"),
  DepartamentoViewModel: Symbol.for("DepartamentoViewModel"),
  IDomainToUI: Symbol.for("IDomainToUI"),
};

export { TYPES };