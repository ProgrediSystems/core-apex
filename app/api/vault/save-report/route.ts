import { NextRequest, NextResponse } from 'next/server';
import { saveReportToVault, TestReportData } from '@/lib/corevault';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { report } = body as { report: TestReportData };

    if (!report) {
      return NextResponse.json(
        { success: false, error: 'Report data is required' },
        { status: 400 }
      );
    }

    if (!report.reportId || !report.title) {
      return NextResponse.json(
        { success: false, error: 'Report must have reportId and title' },
        { status: 400 }
      );
    }

    // Save to Core Vault
    const result = await saveReportToVault(report);

    if (result.success) {
      return NextResponse.json({
        success: true,
        artifactId: result.artifactId,
        viewUrl: result.viewUrl,
        message: 'Report saved to Core Vault successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error saving report to vault:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save report to Core Vault'
      },
      { status: 500 }
    );
  }
}
