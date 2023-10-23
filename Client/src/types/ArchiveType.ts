type ArchiveItem = {
  name: string;
  quantity: number;
  to: string;
};

type Archive = {
  year: number;
  months: ArchiveItem[];
};
