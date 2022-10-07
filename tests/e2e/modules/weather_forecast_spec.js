const helpers = require("../helpers/global-setup");
const weatherFunc = require("../helpers/weather-functions");

describe("Weather module: Weather Forecast", () => {
	afterAll(async () => {
		await helpers.stopApplication();
	});

	describe("Default configuration", () => {
		beforeAll(async () => {
			await weatherFunc.startApp("tests/configs/modules/weather/forecastweather_default.js", {});
		});

		const days = ["Today", "Tomorrow", "Sun", "Mon", "Tue"];
		for (const [index, day] of days.entries()) {
			it("should render day " + day, async () => {
				await weatherFunc.getText(`.weather table.small tr:nth-child(${index + 1}) td:nth-child(1)`, day);
			});
		}

		const icons = ["day-cloudy", "rain", "day-sunny", "day-sunny", "day-sunny"];
		for (const [index, icon] of icons.entries()) {
			it("should render icon " + icon, async () => {
				const elem = await helpers.waitForElement(`.weather table.small tr:nth-child(${index + 1}) td:nth-child(2) span.wi-${icon}`);
				expect(elem).not.toBe(null);
			});
		}

		const maxTemps = ["24.4°", "21.0°", "22.9°", "23.4°", "20.6°"];
		for (const [index, temp] of maxTemps.entries()) {
			it("should render max temperature " + temp, async () => {
				await weatherFunc.getText(`.weather table.small tr:nth-child(${index + 1}) td:nth-child(3)`, temp);
			});
		}

		const minTemps = ["15.3°", "13.6°", "13.8°", "13.9°", "10.9°"];
		for (const [index, temp] of minTemps.entries()) {
			it("should render min temperature " + temp, async () => {
				await weatherFunc.getText(`.weather table.small tr:nth-child(${index + 1}) td:nth-child(4)`, temp);
			});
		}

		const opacities = [1, 1, 0.8, 0.5333333333333333, 0.2666666666666667];
		for (const [index, opacity] of opacities.entries()) {
			it("should render fading of rows with opacity=" + opacity, async () => {
				const elem = await helpers.waitForElement(`.weather table.small tr:nth-child(${index + 1})`);
				expect(elem).not.toBe(null);
				expect(elem.outerHTML).toContain(`<tr style="opacity: ${opacity};">`);
			});
		}
	});

	describe("Absolute configuration", () => {
		beforeAll(async () => {
			await weatherFunc.startApp("tests/configs/modules/weather/forecastweather_absolute.js", {});
		});

		const days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
		for (const [index, day] of days.entries()) {
			it("should render day " + day, async () => {
				await weatherFunc.getText(`.weather table.small tr:nth-child(${index + 1}) td:nth-child(1)`, day);
			});
		}
	});

	describe("Configuration Options", () => {
		beforeAll(async () => {
			await weatherFunc.startApp("tests/configs/modules/weather/forecastweather_options.js", {});
		});

		it("should render custom table class", async () => {
			const elem = await helpers.waitForElement(".weather table.myTableClass");
			expect(elem).not.toBe(null);
		});

		it("should render colored rows", async () => {
			const table = await helpers.waitForElement(".weather table.myTableClass");
			expect(table).not.toBe(null);
			expect(table.rows).not.toBe(null);
			expect(table.rows.length).toBe(5);
		});
	});

	describe("Forecast weather units", () => {
		beforeAll(async () => {
			await weatherFunc.startApp("tests/configs/modules/weather/forecastweather_units.js", {});
		});

		const temperatures = ["24_4°", "21_0°", "22_9°", "23_4°", "20_6°"];
		for (const [index, temp] of temperatures.entries()) {
			it("should render custom decimalSymbol = '_' for temp " + temp, async () => {
				await weatherFunc.getText(`.weather table.small tr:nth-child(${index + 1}) td:nth-child(3)`, temp);
			});
		}
	});
});
