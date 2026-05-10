from log_parser import detect_alerts


sample_log = """
2026-05-09T09:14:22Z INFO user=alice action=login status=success ip=192.0.2.10
2026-05-09T09:16:03Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password
2026-05-09T09:16:18Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password
2026-05-09T09:16:44Z WARN user=bob action=login status=failed ip=198.51.100.23 reason=bad_password
2026-05-09T09:18:30Z WARN user=tester action=password_reset status=requested ip=192.0.2.50 token=demo-token-should-be-redacted
PowerShell.exe -EncodedCommand synthetic-demo-command
"""


if __name__ == "__main__":
    result = detect_alerts(sample_log)

    print(f"Alert count: {result['alertCount']}")
    print()

    for alert in result["alerts"]:
        print(f"- {alert['severity']}: {alert['title']}")
        print(f"  {alert['description']}")
        print(f"  Evidence: {alert['evidence']}")
        print()