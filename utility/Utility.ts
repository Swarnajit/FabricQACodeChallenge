import { expect, Locator, Page } from '@playwright/test';
import { Credentials } from '../playwright.config';
import * as fs from 'fs';

export class Utility {
	static readonly filePath = './data/details.json';
	static jsonData: any;

	public static getValue(key: string): string {
		try {
			const data = fs.readFileSync(this.filePath, 'utf-8');
			this.jsonData = JSON.parse(data);
			return this.jsonData[key] ?? '';
		} catch (error) {
			console.error('Error loading JSON file:', error);
			return '';
		}
	}

	public static writeJsonData(userName: string, password: string): void {
		try {
			const data = fs.readFileSync(this.filePath, 'utf-8');
			this.jsonData = JSON.parse(data);
			this.jsonData.userName = userName;
			this.jsonData.password = password;
			fs.writeFileSync(
				this.filePath,
				JSON.stringify(this.jsonData, null, 2),
				'utf8'
			);
		} catch (error) {
			console.error('Error writing JSON file:', error);
		}
	}
}
