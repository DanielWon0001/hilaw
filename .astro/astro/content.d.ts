declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"2026-three-laws-daily-life.mdx": {
	id: "2026-three-laws-daily-life.mdx";
  slug: "2026-three-laws-daily-life";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"fake-blind-video.mdx": {
	id: "fake-blind-video.mdx";
  slug: "fake-blind-video";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"luoyang-ev-ban-commentary.md": {
	id: "luoyang-ev-ban-commentary.md";
  slug: "luoyang-ev-ban-commentary";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"video-ai-rumor.mdx": {
	id: "video-ai-rumor.mdx";
  slug: "video-ai-rumor";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"wushan-elder-medical-delay.mdx": {
	id: "wushan-elder-medical-delay.mdx";
  slug: "wushan-elder-medical-delay";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
};
"cases": {
"ai-face-swap-case.md": {
	id: "ai-face-swap-case.md";
  slug: "ai-face-swap-case";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"blockchain-company-fraud.md": {
	id: "blockchain-company-fraud.md";
  slug: "blockchain-company-fraud";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-247-wang-bribery.md": {
	id: "case-247-wang-bribery.md";
  slug: "case-247-wang-bribery";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-248-huang-bribery-laundering.md": {
	id: "case-248-huang-bribery-laundering.md";
  slug: "case-248-huang-bribery-laundering";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-249-cai-bribery-money-laundering.md": {
	id: "case-249-cai-bribery-money-laundering.md";
  slug: "case-249-cai-bribery-money-laundering";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-250-he-bribery.md": {
	id: "case-250-he-bribery.md";
  slug: "case-250-he-bribery";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-251-sun-bribery.md": {
	id: "case-251-sun-bribery.md";
  slug: "case-251-sun-bribery";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-252-henan-land-admin.md": {
	id: "case-252-henan-land-admin.md";
  slug: "case-252-henan-land-admin";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-253-hunan-manganese-pollution.md": {
	id: "case-253-hunan-manganese-pollution.md";
  slug: "case-253-hunan-manganese-pollution";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-254-baotou-hazardous-waste.md": {
	id: "case-254-baotou-hazardous-waste.md";
  slug: "case-254-baotou-hazardous-waste";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-255-shandong-radiation-pollution.md": {
	id: "case-255-shandong-radiation-pollution.md";
  slug: "case-255-shandong-radiation-pollution";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-256-guangdong-illegal-mining.md": {
	id: "case-256-guangdong-illegal-mining.md";
  slug: "case-256-guangdong-illegal-mining";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-277-patent-infringement.md": {
	id: "case-277-patent-infringement.md";
  slug: "case-277-patent-infringement";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-278-malicious-litigation.md": {
	id: "case-278-malicious-litigation.md";
  slug: "case-278-malicious-litigation";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"case-279-software-copyright.md": {
	id: "case-279-software-copyright.md";
  slug: "case-279-software-copyright";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
};
"laws": {
"civil-contract-interpretation.md": {
	id: "civil-contract-interpretation.md";
  slug: "civil-contract-interpretation";
  body: string;
  collection: "laws";
  data: InferEntrySchema<"laws">
} & { render(): Render[".md"] };
"generative-ai-regulation.md": {
	id: "generative-ai-regulation.md";
  slug: "generative-ai-regulation";
  body: string;
  collection: "laws";
  data: InferEntrySchema<"laws">
} & { render(): Render[".md"] };
};
"news": {
"ai-fake-photo-refund-scam.md": {
	id: "ai-fake-photo-refund-scam.md";
  slug: "ai-fake-photo-refund-scam";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"ai-law-draft.md": {
	id: "ai-law-draft.md";
  slug: "ai-law-draft";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"china-2026-legislative-plan.mdx": {
	id: "china-2026-legislative-plan.mdx";
  slug: "china-2026-legislative-plan";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".mdx"] };
"china-arbitration-law-revision-2026.mdx": {
	id: "china-arbitration-law-revision-2026.mdx";
  slug: "china-arbitration-law-revision-2026";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".mdx"] };
"china-telecom-token-package-regulation.md": {
	id: "china-telecom-token-package-regulation.md";
  slug: "china-telecom-token-package-regulation";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"cyber-crime-supreme-court.md": {
	id: "cyber-crime-supreme-court.md";
  slug: "cyber-crime-supreme-court";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
