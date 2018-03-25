export class Worder {
  private consonants = 'bcdfghjklmnpqrstvwxyz';
  private vowels = 'aeiou';
  constructor(public greeting: string) {}
  public create(): string {
    const letters = [
      this.getConsonant(),
      this.getVowel(),
      this.getConsonant(),
      this.getVowel(),
      this.getConsonant(),
    ];
    return letters.join('');
  }

  private getConsonant() {
    return this.consonants[Math.floor(Math.random() * this.consonants.length)];
  }
  private getVowel() {
    return this.vowels[Math.floor(Math.random() * this.vowels.length)];
  }
}
