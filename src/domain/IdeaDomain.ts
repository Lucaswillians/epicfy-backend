import { IdeaService } from "../services/IdeaService"
import { IdeaData } from "../types/idea"
import { ValidatorUtils } from "../utils/ValidatorUtils";


export class IdeaDomain {
  private ideaService: IdeaService

  constructor() { 
    this.ideaService = new IdeaService()
  }

  public model(): IdeaService {
    return this.ideaService
  }

  /**
   * @throws Error
   */
  checkDataUpdate(idea: IdeaData) {
    const { description, title, status, is_pinned } = idea

    const hasRequiredData = ValidatorUtils.hasRequiredData([
      description, title, status, is_pinned
    ])
    const hasRequiredValues = ValidatorUtils.hasRequiredValues([
      description, title, status, is_pinned
    ])

    if (!hasRequiredData || !hasRequiredValues) {
      throw new Error('Parâmetros [description, title, status, is_pinned] são obrigatórios')
    }
  }
}
