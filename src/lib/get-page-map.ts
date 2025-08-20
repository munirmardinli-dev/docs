// src/lib/get-page-map.ts
export async function getPageMap() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_UI_URL}/api/page-map`, {
			next: { revalidate: 3600 }
		});

		if (!response.ok) {
			throw new Error('Failed to fetch page map');
		}

		const data = await response.json();
		return data.success ? data.data : [];
	} catch (error) {
		console.error('Error fetching page map:', error);
		return [];
	}
}
