import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { InquiryService } from "@/gen/delta/v1/inquiry_pb";

const transport = createConnectTransport({ baseUrl: "/api", useBinaryFormat: false });

export const inquiryClient = createClient(InquiryService, transport);
