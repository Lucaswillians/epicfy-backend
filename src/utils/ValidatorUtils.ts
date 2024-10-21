export class ValidatorUtils {
  static hasRequiredData(params: any[]): boolean {
    let hasRequired = true;

    for (let param in params) {
      if (typeof params[param] === 'undefined') {
        hasRequired = false;

        break;
      }
    }

    return hasRequired;
  }

  static hasRequiredValues(params: any[]): boolean {
    let hasRequired = true;

    for (let param in params) {
      if (!params[param]) {
        hasRequired = false;

        break;
      }
    }

    return hasRequired;
  }
}
