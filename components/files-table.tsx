"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  File,
  FileText,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

type FileData = {
  id: string;
  url: string;
  path: string;
  originalName: string;
  fileType: string;
  status: "pending" | "processing" | "completed" | "failed";
  extractedData: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  errorLog?: string;
};

export default function FilesTable() {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const files = [
    {
      id: "38b4ea52-388c-4762-868c-5f31923ecb1d",
      url: "https://wjhbkcdphstqusqdfkdx.supabase.co/storage/v1/object/public/roboclaim-bucket/871f8366-6024-4026-b379-ad3d27187c53/34e637a1-4b2d-44d6-8875-7a480fb26cef",
      path: "871f8366-6024-4026-b379-ad3d27187c53/34e637a1-4b2d-44d6-8875-7a480fb26cef",
      originalName: "CV - Victor Saisse - 2025.pdf",
      fileType: "application/pdf",
      status: "completed",
      extractedData:
        "\n\nVICTOR SAISSE | \nLinkedIn | Website \nsaissevictor@gmail.com | +1 (438) 527-2226 | Montreal, Quebec, Canada \n \nTechnical Skills \n \nFrontend: React, React Native, TypeScript, Next.js, Redux, TailwindCSS, Shadcn \nBackend: Node.js, Python, REST/GraphQL APIs, PostgreSQL, MySQL, Shopify GraphQL \nCloud & DevOps: AWS (Lambda, S3, EC2, CDN), GCP, Firebase (Firestore, Cloud Functions), GitHub \nActions CI/CD, Docker \nE-commerce: Shopify Apps/Themes/Headless, Sanity CMS, WMS/POS Integration \nAI/ML: OpenAI, Claude, AI-Powered Recommendation Systems, Chatbots \n \nProfessional Experience \n \nFounder & Full-Stack Developer | EasyFrame | May 2023 – Present \nBuilt AI-driven features including a real-time product recommendation engine and chatbot assistant \nusing OpenAI, improving user engagement by 25% through personalized combo suggestions and \ndiscounts. \nArchitected scalable backend using AWS Lambda, SQS, and Docker for video processing \n(FFmpeg/Python), with Supabase PostgreSQL for real-time data syncing. \nReduced image delivery latency by 40% via AWS S3/CDN integration and optimized API endpoints. \nLed product strategy, UI/UX design, and pitch sessions for investors as a first-time founder. \n \nTech Lead | Evry Jewels | Aug 2023 – Aug 2024 \nDrove 300% profitability growth by overhauling legacy systems: improved website load speed by 60%, \nreduced cart abandonment by 35%, and built a custom Warehouse Management System (WMS) using \nShopify APIs. \nTech Stack: React Native (customer/internal apps), Redux for state management, RabbitMQ, MySQL, \nHeroku. \nImplemented GitHub Actions CI/CD, reducing deployment time by 30% and improving team productivity. \nManaged a team of 5 developers, conducting code reviews and mentoring junior engineers in Agile \npractices. \n \nFull-Stack Developer | Field Office | Sep 2022 – Aug 2023 \nDeveloped Shopify headless e-commerce platforms integrated with Sanity CMS, increasing client \nrevenue by up to 20%. \nBuilt a real estate social media app using React, Redux, and Firebase (Firestore, Cloud Functions). \nDesigned Google Cloud microservices for client analytics dashboards, improving data processing speed. \n \nApplication Developer Analyst | CSP | Jul 2021 – Sep 2022 \nDelivered full-stack solutions for clients using React, Node.js, WordPress, and PHP. \nConducted code reviews, implemented updates, and ensured timely customer deliveries, improving client \nsatisfaction and system reliability. \n \nFull-Stack Developer | NOX Solution | Sep 2020 – Jul 2021 \nDesigned and implemented secure login systems using JWT/OAuth, creating private user areas and \nensuring robust security. Built optimized landing pages and sales funnels using A/B testing. \nAutomated server deployments, including LAMP stack, configured DNS and SSL certificates. \n \nLanguages \n \nFluent: English, Portuguese | Intermediate: French | Basic: Spanish",
      summary:
        "Victor Saisse is a skilled full-stack developer based in Montreal, Canada, with expertise in frontend technologies like React and backend systems including Node.js and Python. He is the founder of EasyFrame, where he developed AI-driven features that enhanced user engagement and optimized backend processes using AWS. Previously, as a Tech Lead at Evry Jewels, he significantly improved profitability and system performance while managing a development team. His experience also includes developing e-commerce platforms and applications, with a strong focus on enhancing client revenue and satisfaction. Victor is fluent in English and Portuguese, with intermediate proficiency in French.",
      createdAt: "2025-03-21 2:35:35",
      updatedAt: "2025-03-21 2:36:34",
      userId: "871f8366-6024-4026-b379-ad3d27187c53",
      errorLog: "",
    },
    {
      id: "79009ba5-85a3-42e2-a701-7a36e67bd56d",
      url: "https://wjhbkcdphstqusqdfkdx.supabase.co/storage/v1/object/public/roboclaim-bucket/871f8366-6024-4026-b379-ad3d27187c53/73b55c4f-a6c7-49f0-9013-b03f5c772b15",
      path: "871f8366-6024-4026-b379-ad3d27187c53/73b55c4f-a6c7-49f0-9013-b03f5c772b15",
      originalName: "CV - Victor Saisse - 2025.pdf",
      fileType: "application/pdf",
      status: "completed",
      extractedData:
        "\n\nVICTOR SAISSE | \nLinkedIn | Website \nsaissevictor@gmail.com | +1 (438) 527-2226 | Montreal, Quebec, Canada \n \nTechnical Skills \n \nFrontend: React, React Native, TypeScript, Next.js, Redux, TailwindCSS, Shadcn \nBackend: Node.js, Python, REST/GraphQL APIs, PostgreSQL, MySQL, Shopify GraphQL \nCloud & DevOps: AWS (Lambda, S3, EC2, CDN), GCP, Firebase (Firestore, Cloud Functions), GitHub \nActions CI/CD, Docker \nE-commerce: Shopify Apps/Themes/Headless, Sanity CMS, WMS/POS Integration \nAI/ML: OpenAI, Claude, AI-Powered Recommendation Systems, Chatbots \n \nProfessional Experience \n \nFounder & Full-Stack Developer | EasyFrame | May 2023 – Present \nBuilt AI-driven features including a real-time product recommendation engine and chatbot assistant \nusing OpenAI, improving user engagement by 25% through personalized combo suggestions and \ndiscounts. \nArchitected scalable backend using AWS Lambda, SQS, and Docker for video processing \n(FFmpeg/Python), with Supabase PostgreSQL for real-time data syncing. \nReduced image delivery latency by 40% via AWS S3/CDN integration and optimized API endpoints. \nLed product strategy, UI/UX design, and pitch sessions for investors as a first-time founder. \n \nTech Lead | Evry Jewels | Aug 2023 – Aug 2024 \nDrove 300% profitability growth by overhauling legacy systems: improved website load speed by 60%, \nreduced cart abandonment by 35%, and built a custom Warehouse Management System (WMS) using \nShopify APIs. \nTech Stack: React Native (customer/internal apps), Redux for state management, RabbitMQ, MySQL, \nHeroku. \nImplemented GitHub Actions CI/CD, reducing deployment time by 30% and improving team productivity. \nManaged a team of 5 developers, conducting code reviews and mentoring junior engineers in Agile \npractices. \n \nFull-Stack Developer | Field Office | Sep 2022 – Aug 2023 \nDeveloped Shopify headless e-commerce platforms integrated with Sanity CMS, increasing client \nrevenue by up to 20%. \nBuilt a real estate social media app using React, Redux, and Firebase (Firestore, Cloud Functions). \nDesigned Google Cloud microservices for client analytics dashboards, improving data processing speed. \n \nApplication Developer Analyst | CSP | Jul 2021 – Sep 2022 \nDelivered full-stack solutions for clients using React, Node.js, WordPress, and PHP. \nConducted code reviews, implemented updates, and ensured timely customer deliveries, improving client \nsatisfaction and system reliability. \n \nFull-Stack Developer | NOX Solution | Sep 2020 – Jul 2021 \nDesigned and implemented secure login systems using JWT/OAuth, creating private user areas and \nensuring robust security. Built optimized landing pages and sales funnels using A/B testing. \nAutomated server deployments, including LAMP stack, configured DNS and SSL certificates. \n \nLanguages \n \nFluent: English, Portuguese | Intermediate: French | Basic: Spanish",
      summary:
        "Victor Saisse is a full-stack developer based in Montreal, Canada, with expertise in frontend and backend technologies, cloud services, and e-commerce solutions. He is the founder of EasyFrame, where he developed AI-driven features that enhanced user engagement and optimized backend processes using AWS and Docker. Previously, as a Tech Lead at Evry Jewels, he significantly improved profitability and website performance while managing a team of developers. His experience also includes developing headless e-commerce platforms and real estate applications, as well as delivering full-stack solutions for various clients. Victor is fluent in English and Portuguese, with intermediate proficiency in French.",
      errorLog: "PDF parsing error: Not implemented",
      createdAt: "2025-03-21 2:54:58",
      updatedAt: "2025-03-21 2:59:58",
      userId: "871f8366-6024-4026-b379-ad3d27187c53",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 mr-1 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.includes("pdf")) {
      return <FileText className="h-4 w-4 mr-1" />;
    }
    return <File className="h-4 w-4 mr-1" />;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const nyTime = toZonedTime(date, "America/New_York");
      return format(nyTime, "MMM d, yyyy h:mm a");
    } catch (e) {
      console.error(e);
      return dateString;
    }
  };

  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Last updated ${formatDistanceToNow(date)} ago`;
    } catch (e) {
      console.error(e);
      return dateString;
    }
  };

  const handleFileClick = (file: FileData) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>File Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow
              key={file.id}
              className="cursor-pointer hover:bg-slate-50"
              onClick={() => handleFileClick(file as FileData)}
            >
              <TableCell>
                <div className="flex flex-col">
                  <div className="font-medium">{file.originalName}</div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className="flex items-center text-xs px-2 py-0.5 uppercase"
                  >
                    {getFileTypeIcon(file.fileType)}
                    {file.fileType.split("/")[1]}
                  </Badge>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`flex items-center ${getStatusBadgeVariant(
                      file.status
                    )}`}
                  >
                    {getStatusIcon(file.status)}
                    {file.status}
                  </Badge>

                  {file.errorLog && (
                    <Badge className="flex items-center text-xs px-2 py-0.5 bg-orange-100 text-orange-800">
                      <AlertTriangle className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{formatDate(file.createdAt)}</TableCell>
              <TableCell>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedFile && (
          <DialogContent
            className="overflow-y-auto max-h-[90vh]"
            style={{ maxWidth: "90vw", width: "90vw" }}
          >
            <DialogHeader>
              <DialogTitle className="break-words">
                {selectedFile.originalName}
              </DialogTitle>
              <DialogDescription>
                {formatDate(selectedFile.createdAt)} •{" "}
                {formatRelativeTime(selectedFile.updatedAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4">
              <h3 className="text-sm font-medium text-green-800 mb-1">
                Summary
              </h3>
              <p className="text-green-700 break-words">
                {selectedFile.summary}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Extracted Data</h3>
              <div className="bg-slate-100 rounded-md p-4 overflow-x-auto">
                <pre className="text-xs whitespace-pre-wrap break-words max-w-full">
                  {selectedFile.extractedData}
                </pre>
              </div>
            </div>

            {selectedFile.errorLog && (
              <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-4">
                <h3 className="text-sm font-medium text-red-800 mb-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Error Log
                </h3>
                <p className="text-red-700 break-words">
                  {selectedFile.errorLog}
                </p>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
